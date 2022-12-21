import ReactDOM from 'react-dom/client';

const MainScreen = () => {
  return (
    <>
      <h1 className="text-5xl">Hello from the component</h1>
      <h2 className="font-quicksand-bold">This is a bold component</h2>
    </>
  );
};

function render() {
  const root = ReactDOM.createRoot(document.querySelector('#app') as HTMLElement);
  root.render(<MainScreen />);
}

render();
