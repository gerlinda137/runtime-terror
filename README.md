# CryptoTrade

Cryptocurrency analysis and trading application built with Angular 20+. The app provides real-time market data, portfolio tracking, and trading simulation using the Binance Testnet API.

## Runtime Terror Team

| Name | GitHub | Location |
|------|--------|----------|
| Angelina Baranova | [gerlinda137](https://github.com/gerlinda137) | Yerevan, Armenia |
| Radmila Shamilova | [radm1la](https://github.com/radm1la) | Tbilisi, Georgia |
| Maryia Vashchayeva | [maryanzh](https://github.com/maryanzh) | Minsk, Belarus |

For backend started:

1. Clone the repository:
bash
```
git clone https://github.com/MaryAnzh/Crypto-Trade-Angular_Task-Backend.git
cd Crypto-Trade-Angular_Task-Backend
```

2. Start Docker Desktop:
Windows
Make sure Docker Desktop is running before starting the containers.

macOS
Open Docker Desktop from Applications or via Spotlight.
Wait until the Docker whale icon shows “Docker is running”.

3. Build and run the backend:
bash
```
docker compose up --build
```
macOS note
If you see a permissions error, run:

bash
```
sudo docker compose up --build
```
(Only needed if Docker was installed with root permissions.)

4. In other terminal window up:
bash
```
npx prisma migrate dev
```

5. Backend API URL (for Postman, for example)

http://localhost:4000

6. Swagger documentation

http://localhost:4000/api/docs

6. For backend testing your can run (docker should be running):
bash
```
npm run test:e2e
```
