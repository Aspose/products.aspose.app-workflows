const fs = require('fs');
const octokit = require('@octokit/rest')(); // Ensure you have the octokit library installed

async function dispatchAllWorkflows() {
  const workflowsDirectory = './.github/workflows'; // Adjust the path to your workflows directory
  const workflows = fs.readdirSync(workflowsDirectory).filter(file => file.endsWith('.yml'));

  for (const workflow of workflows) {
    const workflowName = workflow.replace('.yml', '');
    const response = await octokit.request('POST /repos/Aspose/products.aspose.app-workflows/actions/workflows/{workflow}/dispatches', {
      owner: 'Aspose',
      repo: 'products.aspose.app-workflows',
      workflow: workflowName,
      ref: 'main', // Replace with your branch name
      inputs: {
        environment: process.env.ENVIRONMENT
      }
    });

    console.log(`Dispatched ${workflowName} workflow for environment: ${process.env.ENVIRONMENT} - Status: ${response.status}`);
  }
}

dispatchAllWorkflows().catch(error => {
  console.error(error);
  process.exit(1);
});