import "dotenv/config";
import { Agent ,run } from "@openai/agents";

const helloAgent=new Agent({
    name:'Hello Agent',
    instructions: 'you are an agent that always says hello world with user\'s name'
});


run(helloAgent,'Hey There, My name is Suryansh Verma')
.then((result)=>{
    console.log(result.finalOutput);
})
.catch((error)=>{
    console.error(error);
})