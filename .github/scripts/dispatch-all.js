const fs = require('fs');

const workflowsDirectory = '../workflows'; 
const workflows = fs.readdirSync(workflowsDirectory).filter(file => file.endsWith('.yml'));

for (const workflow of workflows) {
  const workflowName = workflow.replace('.yml', '');
  const response = await octokit.request('POST /repos/Aspose/products.aspose.app-workflows/actions/workflows/{workflow}/dispatches', {
    owner: 'Aspose',
    repo: 'products.aspose.app-workflows',
    workflow: 'workflowName',
    ref: 'main', 
    inputs: {
      environment: process.env.ENVIRONMENT
    }
  });

  console.log(`Dispatched ${workflowName} workflow for environment: ${process.env.ENVIRONMENT} - Status: ${response.status}`);
}
