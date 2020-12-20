const db = require('../models');

const getAllTransaction = async (req, res) => {
  const allTransaction= await db.Transaction.findAll({where: { user_id: req.user.id } });
  res.status(200).send(allTransaction);
}

const addTransaction = async (req, res) => {
  const { name, amount } = req.body;
  const newTransaction = await db.Transaction.create({
    name: req.body.name,
    amount: req.body.amount,
    user_id: req.user.id
  });
  res.status(201).send(newTransaction);
}

const updateTransaction = async (req, res) => {
  const targetId =  Number(req.params.id);
  const { name, amount } = req.body;
  const targetTransaction = await db.Transaction.findOne({ where: { id: targetId, user_id: req.user.id }});
  if (targetTransaction) {
    await targetTransaction.update({
      name: name,
      amount: amount
    });
    res.status(200).send({message: 'Updating is success.'});
  } else {
    res.status(404).send({message: 'Transaction not found.'})
  }
}

const removeTransaction = async (req, res) => {
  const targetId =  Number(req.params.id);
  const targetTransaction = await db.Transaction.findOne({ where: { id: targetId, user_id: req.user.id }});
  if (targetTransaction) {
    await targetTransaction.destroy();
    res.status(204).send({message: 'Transaction deleted.'});
  } else {
    res.status(404).send({message: 'Transaction not found.'})
  }
}

module.exports = {
  getAllTransaction,
  addTransaction,
  updateTransaction,
  removeTransaction
}