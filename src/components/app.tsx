import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDatabase } from '@helmerdavila/fontawesomehelmer/pro-light-svg-icons';

const MainScreen = () => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-15 bg-zinc-300 shadow-lg items-center justify-between">
        <div>
          <div className="block hover:cursor-pointer p-3 border-l-4 border-zinc-600">
            <FontAwesomeIcon icon={faDatabase} className="h-8 text-zinc-600" />
          </div>
          <div className="block hover:cursor-pointer p-3 border-l-4 border-zinc-300">
            <FontAwesomeIcon icon={faDatabase} className="h-8 text-zinc-400" />
          </div>
          <div className="block hover:cursor-pointer p-3 border-l-4 border-zinc-300">
            <FontAwesomeIcon icon={faDatabase} className="h-8 text-zinc-400" />
          </div>
          <div className="block hover:cursor-pointer p-3 border-l-4 border-zinc-300">
            <FontAwesomeIcon icon={faDatabase} className="h-8 text-zinc-400" />
          </div>
        </div>
        <div>
          <div className="flex flex-col w-15 bg-zinc-300 shadow-lg items-center">
            <div className="block hover:cursor-pointer p-3 border-l-4 border-zinc-300">
              <FontAwesomeIcon icon={faCog} className="h-8 text-zinc-400" />
            </div>
          </div>
        </div>
      </div>
      <div className="grow p-5">
        <h1 className="text-5xl">Hello from the component</h1>
        <h2 className="font-quicksand-bold">This is a bold component</h2>
      </div>
    </div>
  );
};

function render() {
  const root = ReactDOM.createRoot(document.querySelector('#app') as HTMLElement);
  root.render(<MainScreen />);
}

render();
