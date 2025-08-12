import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Import HttpClient and HttpErrorResponse
import { CommonModule } from '@angular/common';

interface EmailResponse {
  message: string;
  success: boolean;
}

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.css'
})
export class ContactMe {
  isSending = false;

  constructor(private http: HttpClient) {}

  async onSubmit(event: Event) {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Validate form data
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }

    if (!this.isValidEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Set loading state
    this.isSending = true;

    try {
      const requestBody = { name, email, message };
      console.log('Sending request to API:', requestBody);
      
      // Send email to your API - now returns JSON so we can parse it properly
      const response = await this.http.post<EmailResponse>('http://localhost:5223/api/Email', requestBody).toPromise();
      console.log('API Response:', response);

      if (response && response.success) {
        alert(response.message || 'Email sent successfully!');
        form.reset();
      } else {
        alert('Email sent but there was an issue with the response.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      
      if (error instanceof HttpErrorResponse) {
        console.error('HTTP Error Status:', error.status);
        console.error('HTTP Error Message:', error.message);
        console.error('HTTP Error Details:', error.error);
        
        if (error.status === 0) {
          alert('Cannot connect to the server. Please make sure your API is running on http://localhost:5223');
        } else if (error.status === 404) {
          alert('API endpoint not found. Please check the URL.');
        } else if (error.status === 500) {
          alert('Server error. Please try again later.');
        } else {
          alert(`Failed to send email. Error: ${error.status} - ${error.message}`);
        }
      } else {
        alert('Failed to send email. Please try again.');
      }
    } finally {
      this.isSending = false;
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
