import ReactDOM from 'react-dom/client';
import CreateGameModalContent from './CreateGameModalContent';

/*
jest.mock('../../importFi', () => ({
  importFiles: any => {
    return null;
  }
}));
*/
it('It should mount', () => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);

  root.render(<CreateGameModalContent />);
});