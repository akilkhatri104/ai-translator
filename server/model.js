import { ChatVertexAI } from "@langchain/google-vertexai";
import { HumanMessage,SystemMessage } from "@langchain/core/messages";
import dotenv from "dotenv"

dotenv.config()

class Model{
    constructor(){
        
        this.model = new ChatVertexAI({
            model: "gemini-1.5-flash",
            temperature: 0,
            
          });
    }

    async translate({from,to,text}){
        try {
            const messages = [
                new SystemMessage(`translate the following text from ${from} to ${to},only respond with translation`),
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
                new SystemMessage("Detect the language and only return the language namr with no other text,not even new line charactor"),
                new HumanMessage(text)
            ]

            const res = await this.model.invoke(messages)
            if(res){
                console.log(res);
                return res.content.trim()
                
            }
        } catch (error) {
            console.log("Model :: detectLanguage :: ",error);
            
        }
    }
}

const model = new Model()

export default model