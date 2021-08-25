import DummyController from "../controllers/DummyController.js"
import ProviderController from "../controllers/Provider.js"

export default (app) => {
    app.post('/dummy', DummyController.create);

    app.post('/producer', ProviderController.create)
    app.post('/login', ProviderController.login)
  
    app.all('*', (req, res) => res.status(200).send({
        message: 'Hello World!',
    }));
};