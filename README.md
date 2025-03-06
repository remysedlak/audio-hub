![image](https://github.com/user-attachments/assets/ecec8550-bbad-4946-8e46-30140cad7094)
#### 3/3/2025 MP3 Duration tracker implemented.

![image](https://github.com/user-attachments/assets/e12588be-02df-4f44-a088-0b86ba8efd75)

![image](https://github.com/user-attachments/assets/2b39fdd2-15f7-4eff-9a6d-9b5d15b81526)

built my first custom component, the piano highlighter

![image](https://github.com/user-attachments/assets/428ddc65-2423-468a-b59a-a5519c103dbb)

trying to modify the spectogram I developed now. I believe my piano note finder is incorrect and i will need to reroute the correct ones to the state.



## Currently researching how to implement visualizations for various audio features
#### There seems to not be that many resources online. So maybe I can create my own library for myself and others to use.
My main goal with this project is extract all possible useful information about a song, sample, or anything else that can be represented within an audio file.
I have not found any valid, up to date, WORKING, spectrogram libraries or key finders. I believe that I can manipulate the FFT and Zero Crossing Rate of the audioBuffer
in order find real-time and post-time scales of songs. Shazam doesn't seem to offer public use of it's API, so I could try to build my own song detector. I also figure I need to check out Spotify's API, since it has a lot of features.

## I want to come back to this project after i have put more of a working key detection system. Currently researching how I can build an interactive spectorgram, since I don't see any inspo/existing models online.  






# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
