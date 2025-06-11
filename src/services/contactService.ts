export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export class ContactService {
  private static readonly API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  static async submitContactForm(formData: ContactFormData): Promise<ContactResponse> {
    const validationErrors = this.validateFormData(formData);
    if (validationErrors.length > 0) {
      return {
        success: false,
        message: validationErrors[0].message,
      };
    }

    try {
      const response = await fetch(`${this.API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 400 && errorData.message) {
          return {
            success: false,
            message: Array.isArray(errorData.message) ? errorData.message[0] : errorData.message,
          };
        }
        
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        message: data.message || 'Messaggio inviato con successo! Ti risponderò entro 24 ore.',
      };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
          success: false,
          message: 'Impossibile connettersi al server. Verifica la tua connessione internet.',
        };
      }
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Errore nell\'invio del messaggio. Riprova più tardi.',
      };
    }
  }

  private static validateFormData(formData: ContactFormData): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!formData.name.trim()) {
      errors.push({ field: 'name', message: 'Il nome è obbligatorio.' });
    } else if (formData.name.length > 100) {
      errors.push({ field: 'name', message: 'Il nome non può superare i 100 caratteri.' });
    }

    if (!formData.email.trim()) {
      errors.push({ field: 'email', message: 'L\'email è obbligatoria.' });
    } else if (!this.isValidEmail(formData.email)) {
      errors.push({ field: 'email', message: 'Email non valida.' });
    }

    if (!formData.message.trim()) {
      errors.push({ field: 'message', message: 'Il messaggio è obbligatorio.' });
    } else if (formData.message.length > 1000) {
      errors.push({ field: 'message', message: 'Il messaggio non può superare i 1000 caratteri.' });
    }

    return errors;
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
