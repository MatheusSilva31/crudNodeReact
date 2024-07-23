import express from 'express'
import { getUser,addUser,updateUser,deleteUser, getUserDetails, addAddress,updateAddress,addCountry } from '../controllers/userControllers.js'

const router = express.Router()

router.get('/',getUser)

router.post('/',addUser)

router.put('/:id',updateUser)

router.delete('/:id',deleteUser)

router.get('/user/:id',getUserDetails)

router.post('/user/address',addAddress)

router.put('/user/address/:id',updateAddress)

router.post('/country',addCountry)

export default router