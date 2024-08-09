import React, { useState, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import ImageUploader from './ImageUploader';
import ImageDisplay from './ImageDisplay';
import './App.css';

const App = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (imageUrl) {
      const loadModelAndPredict = async () => {
        setLoading(true); // Start loading
        const model = await mobilenet.load();
        const img = document.getElementById('uploaded-image');
        const predictions = await model.classify(img);
        setPredictions(predictions);
        setLoading(false); // End loading
      };
      loadModelAndPredict();
    }
  }, [imageUrl]);

  return (
    <div className="App">
      <header>Keita's Image Recognition AI</header>
      <p className="app-description">
        This web application allows users to upload an image and leverages a pre-trained AI model to recognize and predict objects within the image. 
        The AI model provides a list of possible objects along with a probability score for each one. 
        The probability score indicates the confidence level of the AI in its prediction, ranging from 0 (no confidence) to 1 (full confidence). 
        A higher number means the AI is more certain that the object in the image matches the predicted label.
      </p>
      <ImageUploader onImageUpload={setImageUrl} />
      <div className="container">
        <div className="image-section">
          
          {imageUrl && (
            <img id="uploaded-image" src={imageUrl} alt="Uploaded" style={{ display: 'none' }} />
          )}
          <ImageDisplay imageUrl={imageUrl} />
        </div>
        <div className="predictions-section">
        
          {loading ? (
            <div className="loading-spinner"></div> // Display loading spinner
          ) : (
            predictions && predictions.length > 0 && (
              <div className="predictions">
                <h3>Predictions:</h3>
                <ul>
                  {predictions.map((prediction, index) => (
                    <li key={index}>
                      <span>{prediction.className}</span>: {prediction.probability.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
        
      </div>
      <div className="skills-section">
        <h3>What This Project Demonstrates:</h3>
        <ul>
          <li><strong>React.js Development:</strong> Building dynamic, responsive user interfaces with React.</li>
          <li><strong>State Management:</strong> Handling state within React components, including loading states.</li>
          <li><strong>API Integration:</strong> Using pre-trained AI models like TensorFlow.js in a web application.</li>
          <li><strong>Frontend Design:</strong> Creating modern and appealing UI/UX using CSS and Flexbox.</li>
          <li><strong>JavaScript Proficiency:</strong> Implementing core JavaScript functionality within a React framework.</li>
          <li><strong>Async Operations:</strong> Managing asynchronous data processing (e.g., image recognition) using async/await.</li>
          <li><strong>File Handling:</strong> Uploading and processing files within a web application.</li>
          <li><strong>Performance Optimization:</strong> Ensuring fast loading and smooth user experience with React.</li>
          <li><strong>Responsive Design:</strong> Designing layouts that work across different screen sizes and devices.</li>
          <li><strong>Version Control:</strong> Using Git for source code management and collaboration.</li>
          <li><strong>Deployment:</strong> Deploying a web application to a live server, such as Cloudways.</li>
        </ul>
      </div>
    </div>
  );
};

export default App;