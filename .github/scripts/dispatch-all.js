const fs = require('fs');

async function dispatchAllWorkflows() {
  const workflowsDirectory = '../workflows'; // Change to the directory where your workflows are stored
  const workflows = fs.readdirSync(workflowsDirectory).filter(file => file.endsWith('.yml'));

  for (const workflow of workflows) {
    const workflowName = workflow.replace('.yml', '');
    const response = await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow}/dispatches', {
      owner: process.env.GITHUB_REPOSITORY.split("/")[0],
      repo: process.env.GITHUB_REPOSITORY.split("/")[1],
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
