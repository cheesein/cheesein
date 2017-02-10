# cheeseIn [![Build Status](https://travis-ci.org/cheesein/cheesein.svg?branch=master)](https://travis-ci.org/cheesein/cheesein) [![Code Climate](https://codeclimate.com/github/cheesein/cheesein/badges/gpa.svg)](https://codeclimate.com/github/cheesein/cheesein) [![Dependency Status](https://gemnasium.com/badges/github.com/cheesein/cheesein.svg)](https://gemnasium.com/github.com/cheesein/cheesein) [![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-green.svg)](http://www.gnu.org/licenses/agpl-3.0)

---

This is a check-in system to help you better coordinate groups of people.

---

<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIwLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe29wYWNpdHk6NS4wMDAwMDBlLTAyO2ZpbGw6dXJsKCNTVkdJRF8xXyk7fQoJLnN0MXtmaWxsOiNGRkREMzM7fQoJLnN0MntmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8cmFkaWFsR3JhZGllbnQgaWQ9IlNWR0lEXzFfIiBjeD0iMjU1LjUyODYiIGN5PSI4Ni40MzM2IiByPSIyNDcuMDY4OCIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwLjk5MTQgMC4xMzEyIC0zLjA3NzM2OGUtMDIgMC4yMzI2IDEwLjg5NTMgMzA0Ljk4OTUpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+Cgk8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwIi8+Cgk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwO3N0b3Atb3BhY2l0eTowIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01MDYuNSwzOTFjLTQuMiwzMS43LTExNy4zLDQzLTI1Mi41LDI1LjFjLTEzNS4zLTE3LjktMjQxLjUtNTguMS0yMzcuMy04OS45czExNy4zLTQzLDI1Mi41LTI1LjEKCUM0MDQuNCwzMTksNTEwLjcsMzU5LjMsNTA2LjUsMzkxeiIvPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04MS45LDE3MC4zYzQ3LjgtMjkuNiwxNjEuNy01MS4xLDIyNy45LTQwbDEyMS40LDEwMi40TDgxLjksMTcwLjN6Ii8+CjwvZz4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNODMsMzMyLjhWMTcyLjdsMzQ1LDYxLjd2NzQuM2MtMTMsMy41LTIxLjksMTUuMy0yMS45LDI4LjdjMCwxMy40LDguOSwyNS4yLDIxLjksMjguN3YyMi41TDgzLDMzMi44eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTg1LDE3NS4xbDM0MSw2MXY3MS4xYy0xMyw0LjItMjEuOSwxNi40LTIxLjksMzAuMmMwLDEzLjgsOC45LDI2LDIxLjksMzAuMnYxOC43TDg1LDMzMS4xVjE3NS4xIE04MSwxNzAuMwoJCXYxNjQuM2wzNDksNTYuNHYtMjYuNGMtMTItMi43LTIxLjktMTMuOC0yMS45LTI3LjFjMC0xMy4zLDkuOS0yNC40LDIxLjktMjcuMXYtNzcuNkw4MSwxNzAuM0w4MSwxNzAuM3oiLz4KPC9nPgo8Zz4KCTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjEzNSIgY3k9IjI0Ny44IiByPSIzMi40Ii8+CjwvZz4KPGc+Cgk8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSIxOTQuNCIgY3k9IjMwMC43IiByPSIyMS40Ii8+CjwvZz4KPGc+Cgk8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSIyNTYuNSIgY3k9IjI0Ny44IiByPSIyNS41Ii8+CjwvZz4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTM3Mi45LDI3OC44Yy03LjctNy4xLTE5LjYtNi42LTI2LjcsMS4xYy0xLjQsMS41LTIuNCwzLjEtMy4zLDQuOWMtMC40LTAuNC0wLjgtMC44LTEuMi0xLjIKCWMtMTMuMS0xMi4xLTMzLjYtMTEuMi00NS42LDEuOWMtMTIuMSwxMy4xLTExLjIsMzMuNiwxLjksNDUuNmMxMy4xLDEyLjEsMzMuNiwxMS4yLDQ1LjYtMS45YzUuMS01LjYsNy45LTEyLjQsOC40LTE5LjQKCWM3LjMsMy40LDE2LjIsMS45LDIyLTQuM0MzODEuMSwyOTcuOCwzODAuNiwyODUuOCwzNzIuOSwyNzguOHoiLz4KPC9zdmc+Cg==" height="200" align="right">

## ➕ Features
- fast registration of participants
- data is stored in MongoDB
- have an overview with status of each participant
- easily extendable


## 🌐 Installation

Install components and start server with
```
yarn install
yarn start
```
##### Install MongoDB

On Macs with brew:
```
brew install mongodb
mongod --config /usr/local/etc/mongod.conf
```

## ⚖️ License
[ℹ️ AGPL v3 ℹ️](http://www.gnu.org/licenses/agpl-3.0)

## 📈 Developers
The core team has a progress schedule once a month.

For feedback, questions or suggestions get in contact with

- <img src="https://avatars3.githubusercontent.com/u/914637?v=3&s=460" height="60"> [Benjamin](https://github.com/lumio)
- <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/854371/profile/profile-80_2.jpg" height="60"> [Daniel](https://github.com/DDCreationStudios)
