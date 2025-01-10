import { ChatVertexAI } from "@langchain/google-vertexai";
import { HumanMessage,SystemMessage } from "@langchain/core/messages";
import dotenv from "dotenv"

dotenv.config()

class Model{
    constructor(){
        this.model = new ChatVertexAI({
            model: "gemini-1.5-flash",
            temperature: 0,
            authOptions: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            projectId: process.env.GOOGLE_PROJECT_ID
          });
    }

    async translate({from,to,text}){
        try {
            const messages = [
                new SystemMessage(`translate the following text from ${from} to ${to}`),
                new HumanMessage(text)
            ]

            const res = await this.model.invoke(messages)

            if(res){
                console.log(res);
                return res.content
            }
        } catch (error) {
            console.log("Model :: translate :: ",error);
        }
    }

    async detectLanguage(text){
        try {
            const messages = [
                new HumanMessage(text),
                new SystemMessage("Detect the language")
            ]

            const res = await this.model.invoke(messages)
            if(res){
                console.log(res);
                return res.content
                
            }
        } catch (error) {
            console.log("Model :: detectLanguage :: ",error);
            
        }
    }
}

const model = new Model()
model.translate({from:"en",to:"hi",text:"hello"})

export default model