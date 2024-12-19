<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Pinnit-UBC/pinnit-ubc">
    <img src="/src/app/icon.png" alt="Logo" width="80" height="80">
  </a>

<h2 align="center">Pinnit</h2>

  <p align="center">
     Pinnit is a platform designed to help students stay informed about various events happening across different clubs and organizations at the University of British Columbia (UBC).
    <br />
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

### Built With

- [![Next.js][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Express][Express.js]][Express-url]
- [![MongoDB][MongoDB]][MongoDB-url]
- [![Node.js][Node.js]][Node-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

### Getting Started

### Prerequisites

- Must have **Node.js** and **npm** installed on your computer
- Access to MongoDB collection

### Installation

1. Clone the repo and access the folder
   ```sh
   git clone https://github.com/Pinnit-UBC/pinnit-ubc.git
   cd pinnit-ubc
   ```
2. Install npm packages in home directory
   ```sh
   npm install
   ```
3. Create a .env file

   ```sh
   touch .env
   ```

   and fill in the .env file with the following variables

   ```env
   REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_KEY_GOOGLE_MAPS_API_KEY
   REACT_APP_DRAWER_MAP_API_KEY=YOUR_DRAWER_MAP_API_KEY
   MONGO_URI=YOUR_MONGO_URI
   ```

4. Host the application on your local server
   ```bash
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

- **Event Discovery:** Browse through upcoming campus events, such as club meetings, academic talks, or social gatherings, based on categories and filters
- **Add your own events:** Create and publish your own campus events, allowing you to share event details with the broader campus community.
- **Share events:** Easily share event details with friends or groups via email, social media, or direct links.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/Pinnit-UBC/Pinnit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Pinnit-UBC/Pinnit" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Pinnit-UBC/Pinnit.svg?style=for-the-badge
[contributors-url]: https://github.com/Pinnit-UBC/Pinnit/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Pinnit-UBC/Pinnit.svg?style=for-the-badge
[forks-url]: https://github.com/Pinnit-UBC/Pinnit/network/members
[stars-shield]: https://img.shields.io/github/stars/Pinnit-UBC/Pinnit.svg?style=for-the-badge
[stars-url]: https://github.com/Pinnit-UBC/Pinnit/stargazers
[issues-shield]: https://img.shields.io/github/issues/Pinnit-UBC/Pinnit.svg?style=for-the-badge
[issues-url]: https://github.com/Pinnit-UBC/Pinnit/issues
[license-shield]: https://img.shields.io/github/license/Pinnit-UBC/Pinnit.svg?style=for-the-badge
[license-url]: https://github.com/Pinnit-UBC/Pinnit/LICENSE.md
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=fff
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
