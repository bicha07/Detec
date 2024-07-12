import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ChatbotComponent implements OnInit, OnDestroy {
  userInputControl: FormControl = new FormControl('', Validators.required);
  typing: boolean = false;
  conversationStarted: boolean = false;
  messageCount: number = 0;
  sessionId: string | null = null;
  receiveSound = new Audio('assets/receive.mp3');
  private socket: WebSocket | null = null;
  private automatedResponsesActive: boolean = true; // Flag to manage automated responses
  private typingIndicatorElement: HTMLElement | null = null;
  responses: { [key: string]: string } = {
    "services": "We offer a range of services including assembly, welding, and industrial work...",
    "company": "Detec Industriels specializes in advanced industrial solutions...",
    "contact": "You can reach us through our website, by phone, or by visiting our office...",
    "hello": "Hi there! What can I help you with today?",
    // Add other responses here...
  };
  isChatOpen: boolean = false;

  constructor(private http: HttpClient, private serviceService: ServiceService, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.initializeSession();
    this.setupWebSocket();
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  sendMessage(): void {
    const userMessage = this.userInputControl.value.trim();
    if (userMessage) {
      this.addMessage(userMessage, 'user-message');
      this.userInputControl.setValue('');
      this.typing = true;
      setTimeout(() => {
        if (this.automatedResponsesActive) { // Check if automated responses are active
          this.getBotResponse(userMessage);
        }
        this.typing = false;
      }, 800);

      this.notifyAdmin(userMessage);
    }
  }

  addMessage(message: string, className: string): void {
    const chatBox = this.el.nativeElement.querySelector('#chatBox');
    if (chatBox) {
      const messageElement = this.renderer.createElement('div');
      this.renderer.addClass(messageElement, 'message');
      this.renderer.addClass(messageElement, className);

      const messageText = this.renderer.createElement('span');
      const text = this.renderer.createText(message);

      this.renderer.appendChild(messageText, text);
      this.renderer.appendChild(messageElement, messageText);
      this.renderer.appendChild(chatBox, messageElement);
      chatBox.scrollTop = chatBox.scrollHeight;

      if (className === 'bot-message') {
        this.receiveSound.play();
      }
    }
  }

  getBotResponse(message: string): void {
    const lowerCaseMessage = message.toLowerCase();
    let response = "I'm sorry, I didn't understand that. Could you please rephrase?";

    for (const keyword in this.responses) {
      if (lowerCaseMessage.includes(keyword)) {
        response = this.responses[keyword];
        break;
      }
    }

    this.addMessage(response, 'bot-message');
    this.messageCount++;

    if (this.messageCount === 1) {
      this.addMessage("Our customer support team has been notified and will assist you shortly. Thank you for your patience.", 'bot-message');
    }

    if (lowerCaseMessage.includes("admin")) {
      this.addMessage("A customer support representative will be available to chat soon. Meanwhile, you can continue chatting with me.", 'bot-message');
    }
  }

  toggleChat(): void {
    const chatContainer = this.el.nativeElement.querySelector('.chat-container');
    const chatheader = this.el.nativeElement.querySelector('.chat-header');
    const chatContent = this.el.nativeElement.querySelector('#chatContent');
    this.isChatOpen = !this.isChatOpen;
    if (chatContainer) {
      chatheader.classList.toggle('chat-header-active');
      chatContainer.classList.toggle('chat-container-active');
    }
    if (chatContent) {
      chatContent.style.display = chatContent.style.display === 'none' || chatContent.style.display === '' ? 'flex' : 'none';
    }
  }
  

  startConversation(message: string): void {
    this.userInputControl.setValue(message);
    this.conversationStarted = true;
    setTimeout(() => {
      this.conversationStarted = true;
      this.sendMessage();
    }, 500);
  }

  ensureSessionId(): void {
    const existingSessionId = localStorage.getItem('chatbot_session_id');
    if (!existingSessionId) {
      const newSessionId = this.generateSessionId();
      localStorage.setItem('chatbot_session_id', newSessionId);
      this.sessionId = newSessionId;
    } else {
      this.sessionId = existingSessionId;
    }
  }

  generateSessionId(): string {
    return 'session-' + Math.random().toString(36).substr(2, 9);
  }

  getSessionId(): string | null {
    return localStorage.getItem('chatbot_session_id');
  }

  notifyAdmin(message: string): void {
    const sessionId = this.getSessionId();
    if (sessionId) {
      this.serviceService.notifyAdmin(sessionId, message).subscribe(
        data => console.log('Admin notified:', data),
        error => console.error('Error notifying admin:', error)
      );
    }
  }

  setupWebSocket(): void {
    const sessionId = this.getSessionId();
    if (sessionId) {
      this.socket = new WebSocket(`ws://localhost:3000/?sessionId=${sessionId}`);
  
      this.socket.onopen = () => {
        console.log(`WebSocket connection established for session ${sessionId}`);
      };
  
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.typing) {
          this.showTypingIndicator();
        } else {
          this.addMessage(data.message, 'bot-message');
          this.automatedResponsesActive = false; // Disable automated responses
          this.hideTypingIndicator();
        }
      };
  
      this.socket.onclose = () => {
        console.log(`WebSocket connection closed for session ${sessionId}`);
      };
  
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  private initializeSession(): void {
    this.ensureSessionId();
  }

  private showTypingIndicator(): void {
    if (!this.typingIndicatorElement) {
      this.typingIndicatorElement = this.renderer.createElement('div');
      this.renderer.addClass(this.typingIndicatorElement, 'typing-indicator');
      const chatBox = this.el.nativeElement.querySelector('#chatBox');
      if (chatBox) {
        this.renderer.appendChild(chatBox, this.typingIndicatorElement);
        const typingText = this.renderer.createText('Admin is typing...');
        this.renderer.appendChild(this.typingIndicatorElement, typingText);
      }
    }
    if (this.typingIndicatorElement) {
      this.typingIndicatorElement.style.display = 'block';
    }
  }

  private hideTypingIndicator(): void {
    if (this.typingIndicatorElement) {
      this.typingIndicatorElement.style.display = 'none';
    }
  }
}
