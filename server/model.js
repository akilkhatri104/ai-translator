import { ChatVertexAI } from "@langchain/google-vertexai-web";
import { HumanMessage,SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv"

dotenv.config()

class Model{
    constructor(){
        this.credentials = String(process.env.GOOGLE_WEB_CREDENTIALS)
        this.projectId = String(process.env.GOOGLE_PROJECT_ID)
        this.model = new ChatVertexAI({
            model: String(process.env.GEMINI_MODEL),
            temperature: 0,
            authOptions: {
                credentials: this.credentials,
            },
            projectId: this.projectId,
            
          });
    }

    async translate({from,to,text}){
        try {
            const systemTemplate = "Translate the following from {from} into {to} and only return the translation without any other text,not even new line charactor";
            const promptTemplate = ChatPromptTemplate.fromMessages([
                ["system", systemTemplate],
                ["user", "{text}"],
              ]);
            
            const prompt = await promptTemplate.invoke({
                from,
                to,
                text
            })

            const res = await this.model.invoke(prompt)

            if(res){
                console.log(res);
                return res
            }
        } catch (error) {
            console.log("Model :: translate :: ",error.message);
            console.log("Model :: translate :: ",error.stack);
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