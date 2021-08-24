import DummyController from "../controllers/DummyController.js"

export default (app) => {
    app.post('/dummy', DummyController.create);
  
    app.all('*', (req, res) => res.status(200).send({
        message: 'Hello World!',
    }));
};