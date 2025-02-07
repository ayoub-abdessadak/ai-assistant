
import axios from "axios";

class AiApi {
    constructor() {
        this.baseUrl = "http://localhost:11434/v1"; 
        this.apiKey = 'ollama';  
        this.axios = axios.create({
          baseURL: this.baseUrl, 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
        });
      }
    
      askQuestion(model, messages) {
        return new Promise((resolve, reject) => {
          this.axios.post('/chat/completions', {
            model: model, 
            messages: messages, 
          })
          .then(response => {
            resolve(response.data); 
          })
          .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
            reject(error); 
          });
        });
      }
    }

export default AiApi;