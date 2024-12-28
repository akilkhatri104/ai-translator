import {ChatVertexAI} from '@langchain/google-vertexai-web'
import {HumanMessage,SystemMessage} from '@langchain/core/messages'



// console.log(credentials);







class Model{
    constructor(){
        this.credentials = import.meta.env.VITE_GOOGLE_CREDENTIALS
        this.googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY
        this.id = import.meta.env.VITE_GOOGLE_PROJECT_ID
        this.model = new ChatVertexAI({
            model: 'gemini-1.5-flash',
            temperature: 0,
            authOptions: {
                credentials: this.credentials
            },
            // apiKey: this.googl   eApiKey,
            projectId: this.id,
            
        })
    }

    async translate({from,to,text}){
        try {
            const messages = [
                new SystemMessage(`You are a translator from ${from} to ${to}`),
                new HumanMessage(text)
            ]

            const data = await this.model.invoke(messages)
            return data
        } catch (error) {
            console.log("Model :: translate: ",error);
            
        }
    }

    async detectLanguage(text){
        try {
            const messages = [
                new SystemMessage('You are a translator, detect the language'),
                new HumanMessage(text)
            ]
                
            
        } catch (error) {
            console.log("Model :: detectLanguage : ",error);
            
        }
    }
}


const model = new Model()
export default model