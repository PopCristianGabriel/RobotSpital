Pentru rulare server:

. start.script



Accesare din browser:

192.168.0.125:80


Dezvoltare front-end:
creare proiect:
	npx create-react-app my_app
	cd my_app

pornire mediu dezvoltare:
	npm start

accesare mediu dezvoltare:
	localhost:3000

build site pt export pe raspberry:
	npm run build

locatie site apache pe raspberry:
	mv -r build /var/www/html/


instalare material ui si chestii de la el:
npm install @material-ui/core
npm install @material-ui/icons
