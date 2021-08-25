import DummyController from "../controllers/DummyController.js"
import ProviderController from "../controllers/Provider.js"
import LoactionController from "../controllers/Location.js"

export default (app) => {
    app.post('/dummy', DummyController.create);

    app.post('/producer', ProviderController.create)
    app.post('/login', ProviderController.login)
  
    app.post('/location', LoactionController.create)
    
    app.all('*', (req, res) => res.status(200).send({
        message: 'Hello World!',
    }));
};