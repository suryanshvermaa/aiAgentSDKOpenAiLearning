import "dotenv/config";
import {Agent,run,tool} from "@openai/agents";
import {z} from "zod";
import axios from "axios";

const getWeatherTool=tool({
    name: 'getWeather',
    description: 'Get the current weather for a given location',
    parameters: z.object({
        city: z.string().describe('name of the city')
    }),
    execute: async function({city}){
        console.log(`🛠️  Calling getWeather for ${city}`);
        const url= `https://wttr.in/${city.toLowerCase()}?format=%C+%t`
        const response=await axios.get(url,{responseType: 'text'});
        return `The current weather in ${city} is: ${response.data}`;
    }
})

const sendEmailTool=tool({
    name: 'sendEmail',
    description: 'Send an email to a recipient',
    parameters: z.object({
        recipient: z.string().describe('email address of the recipient'),
        subject: z.string().describe('subject of the email'),
        body: z.string().describe('body of the email')
    }),
    execute: async function({recipient,subject,body}){
        console.log(`🛠️  Calling sendEmail to ${recipient}`);
        // Simulate sending an email
        return `Email sent to ${recipient} with subject "${subject}" and body "${body}"`;
    }
})

const agent=new Agent({
    name: 'Weather Agent',
    instructions: `
        You are an expert weather agent that helps users to tell
        weather report,
        You can also send email to users if they ask you to.
    `,
    tools: [getWeatherTool, sendEmailTool]
})

async function main(query=''){
    const response=await run(agent,query);
    console.log(`Result: ${response.finalOutput}`)
}

main('What is the weather like in Patna and if temperature is below 30°C then send an email to suryanshv.ug23.ee@nitp.ac.in?')