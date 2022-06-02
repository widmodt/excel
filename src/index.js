import './scss/index.scss';

async function start() {
   return await Promise.resolve( 'async working' )
}

start().then(console.log)