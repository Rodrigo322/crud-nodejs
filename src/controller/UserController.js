const User = require('../models/User')
module.exports = {
  async craeteUser(req, res) {
    try {
      const { name, email } = req.body
      const user = await User.findOne({ where: { email } })
      if (user) {
        res.status(401).json({ message: "Já existe um usuario com este email" })
      } else {
        const user = await User.create({ name, email })
        res.status(200).json({ user })
      }
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  async updateUser(req, res) {
    try {
      const { id } = req.params
      const { name, email } = req.body
      const user = await User.findOne({ where: { id } })
      if (!user) {
        res.status(401).json({ message: "Nenhum usuario encontrado" })
      } else {
        const user = await User.update({ name, email }, { where: { id } })
        res.status(200).json({ user })
      }
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  async listUsers(req, res) {
    try {
      const users = await User.findAll()
      if (!users) {
        res.status(401).json({ message: 'Não existe usuario cadastros' })
      }
      res.status(200).json({ users })
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  async deleteUser(req, res) {
    const { id } = req.params
    const user = await User.findOne({ where: { id } })
    if (!user) {
      res.status(401).json({ message: 'Usuario não encontrado' })
    } else {
      await User.destroy({ where: { id } })
      res.status(200).json({ ok: true })
    }
  }
}