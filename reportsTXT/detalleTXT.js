const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON
const jsonFilePath = 'reports/cucumber-htmlreport.html/jsonlogs/log.json';

// Ruta del archivo de salida
const outputPath = 'reportsTXT\\output.txt';

// Lee el archivo JSON
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  try {
    const scenarios = JSON.parse(data);
    let output = '';

    scenarios.forEach((scenario, scenarioIndex) => {
      const scenarioText = `Scenario ${scenarioIndex + 1}: ${scenario.name}\n`;
      console.log(scenarioText);
      output += scenarioText;
      
      scenario.elements.forEach((element, elementIndex) => {
        const elementText = `  Element ${elementIndex + 1}: ${element.name}\n`;
        console.log(elementText);
        output += elementText;
        
        element.steps.forEach((step, stepIndex) => {
          const stepText = `    Step ${stepIndex + 1}: ${step.name} (${step.result.status})\n`;
          console.log(stepText);
          output += stepText;
          
          if (step.result.status === 'failed' && step.result.error_message) {
            const errorMessageText = `      Error: ${step.result.error_message}\n`;
            console.log(errorMessageText);
            output += errorMessageText;
          }

          if (step.embeddings && step.embeddings.length > 0) {
            step.embeddings.forEach((embedding, embeddingIndex) => {
              const embeddingText = `      Embedding ${embeddingIndex + 1}: [data omitted]\n`;
              console.log(embeddingText);
              output += embeddingText;
            });
          }
        });
      });
    });

    // Guarda el texto en el archivo de salida
    fs.writeFile(outputPath, output, (err) => {
      if (err) {
        console.error('Error al guardar el archivo de texto:', err);
      } else {
        console.log(`Archivo de texto guardado en ${outputPath}`);
      }
    });

  } catch (err) {
    console.error('Error al parsear el JSON:', err);
  }
});