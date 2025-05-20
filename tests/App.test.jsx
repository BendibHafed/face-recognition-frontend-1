import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../src/App.jsx';

jest.mock('../src/components/Navigation/Navigation.jsx', () => (props) => (
  <div>
    Navigation - SignedIn: {props.isSignedIn ? 'Yes' : 'No'}
    <button onClick={() => props.onRouteChange('signin')}>Go Signin</button>
  </div>
));

jest.mock('../src/components/Logo/Logo.jsx', () => () => <div>Logo</div>);

jest.mock('../src/components/ImageLinkForm/ImageLinkForm.jsx', () => (props) => (
  <div>
    ImageLinkForm
    <input onChange={props.onInputChange} data-testid="input" />
    <button onClick={props.onPictureSubmit}>Submit</button>
  </div>
));

jest.mock('../src/components/Rank/Rank.jsx', () => (props) => (
  <div>Rank - {props.name}, Entries: {props.entries}</div>
));

jest.mock('../src/components/FaceRecognition/FaceRecognition.jsx', () => (props) => (
  <div>
    FaceRecognition - Image URL: {props.imageUrl}
    <pre>{JSON.stringify(props.box)}</pre>
  </div>
));

jest.mock('../src/components/Signin/Signin.jsx', () => (props) => (
  <div>
    Signin
    <button onClick={() => props.onRouteChange('home')}>Go Home</button>
  </div>
));

jest.mock('../src/components/Register/Register.jsx', () => (props) => (
  <div>
    Register
    <button onClick={() => props.onRouteChange('signin')}>Go Signin</button>
  </div>
));

describe('App component', () => {
  beforeEach(() => {
    // Mock document.getElementById for 'inputImage' to avoid null errors in calculateFaceLocation
    const fakeImage = { width: 640 };
    jest.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'inputImage') {
        return fakeImage;
      }
      return null;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders Signin initially', () => {
    render(<App />);
    expect(screen.getByText('Signin')).toBeInTheDocument();
  });

  test('changes route to home when signin button clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Go Home'));
    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText(/Navigation - SignedIn: Yes/)).toBeInTheDocument();
  });

  test('updates input and submits picture', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            faceData: {
              data: {
                regions: [
                  {
                    region_info: {
                      bounding_box: {
                        left_col: 0.1,
                        top_row: 0.1,
                        right_col: 0.9,
                        bottom_row: 0.9,
                      },
                    },
                  },
                ],
              },
            },
            entries: 1,
          }),
      })
    );

    render(<App />);
    fireEvent.click(screen.getByText('Go Home'));

    fireEvent.change(screen.getByTestId('input'), { target: { value: 'http://test.com/image.jpg' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
      expect(screen.getByText(/FaceRecognition - Image URL: http:\/\/test.com\/image.jpg/)).toBeInTheDocument()
    );

    global.fetch.mockRestore();
  });
});
