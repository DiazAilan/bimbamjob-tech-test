import { useState } from 'react';
import './App.scss';
import Field, {
  Mower,
  MowerMovement,
  MowerOrientation,
} from './components/Field';
import FileInput from './components/FileInput';

function App(): JSX.Element {
  const [field, setField] = useState({
    width: 0,
    height: 0,
    mowers: [] as Mower[],
  });

  const loadConfigFile = (config: string) => {
    const instructions = config.split('\n');
    const [fieldInstructions] = instructions;
    const mowerInstructions = instructions
      .slice(1)
      .filter((instruction: string, index: number) => index % 2 === 0)
      .map(
        (instruction: string, index: number) =>
          instruction + instructions[index * 2 + 2],
      );
    const mowers = mowerInstructions.map((mowerData: string) => {
      const [positionData, movementData] = mowerData.split(' ');
      const position = {
        x: parseInt(positionData[0]),
        y: parseInt(positionData[1]),
      };
      const orientation = movementData[0] as MowerOrientation;
      const movement = [...movementData.slice(1)] as MowerMovement[];
      return { position, movement, orientation };
    });
    setField({
      width: parseInt(fieldInstructions[0]),
      height: parseInt(fieldInstructions[1]),
      mowers,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        {field.width && field.height ? (
          <Field config={field} />
        ) : (
          <div>No file data loaded</div>
        )}
        <FileInput
          onFileLoaded={(fileData: string) => loadConfigFile(fileData)}
        />
      </header>
    </div>
  );
}

export default App;
