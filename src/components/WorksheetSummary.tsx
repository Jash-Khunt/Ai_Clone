import { useSelector } from 'react-redux';
import { RootState } from '../store';

const WorksheetSummary = () => {
  const {
    inputMethod,
    curriculum,
    grade,
    subject,
    files,
    topic,
    customizations,
    stateBoardState,
    numberOfQuestions,
    boardId,
    questionText,
    aiResponse
  } = useSelector((state: RootState) => state.worksheet);

  const isStateBoard = curriculum === 'state';
  console.log('Redux state:', useSelector((state: RootState) => state.worksheet));

  return (
    <div>
      <h2>Worksheet Summary</h2>
      <p><strong>Input Method:</strong> {inputMethod}</p>
      <p><strong>Curriculum:</strong> {isStateBoard ? 'State Board' : curriculum}</p>
      {isStateBoard && (
        <p><strong>State:</strong> {stateBoardState || '-'}</p>
      )}
      <p><strong>Board ID:</strong> {boardId || '-'}</p>
      <p><strong>Grade:</strong> {grade}</p>
      <p><strong>Subject:</strong> {subject}</p>
      <p><strong>Number of Questions:</strong> {numberOfQuestions}</p>

      {inputMethod === 'type' && (
        <p><strong>Topic:</strong> {topic}</p>
      )}

      {inputMethod === 'upload' && (
        <div>
          <strong>Files:</strong>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <p><strong>Customizations:</strong> {customizations.length > 0 ? customizations.join(', ') : '-'}</p>

      {aiResponse && (
        <div>
          <h3>📝 Generated Worksheet:</h3>
          <pre>{aiResponse}</pre>
        </div>
      )}

      {questionText && (
        <div>
          <h3>🧠 Original Question Text:</h3>
          <pre>{questionText}</pre>
        </div>
      )}

    </div>
  );
};

export default WorksheetSummary;
  