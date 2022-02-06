const {db} = require('../config');

const getAllUser = async (req, res) => {
  try {
        let query = db.collection('users');
        let response = [];
        const querySnapshot = await query.get();
        querySnapshot.forEach((doc) => response.push(doc.data()));
        return res.status(200).json({
            status: 'success',
            message: response.length ?
                'users retrieved successfully' :
                'no user found',
            data: response.length ? response : null,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

const getUser = async (req, res) => {
    try {
        const document = db.collection('users').doc(req.params.user_id);
        let item = await document.get();
        let response = item.data();
        return res.status(200).json({
            status: 'success',
            message: response ? 'user retrieved successfully' : `no user found with ${req.params.user_id} id`,
            data: response ? response : null,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

const createUser = async (req, res) => {
    try {
        const user = db.collection('users').doc();

        const {
            firstName,
            lastName,
            address_1,
            address_2,
            town,
            region,
            country,
            postCode,
            contactNumber
        } = req.body;

        const userObject = {
            id: user.id,
            firstName,
            lastName,
            address_1,
            address_2,
            town,
            region,
            country,
            postCode,
            contactNumber
        }

        await user.set(userObject);

        return res.status(200).send({
            status: 'success',
            message: 'user added successfully',
            data: userObject,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const {
            body: {
                firstName,
                lastName,
                address_1,
                address_2,
                town,
                region,
                country,
                postCode,
                contactNumber
            }, params: { user_id } } = req

        const entry = db.collection('users').doc(user_id)
        let item = await entry.get();
        let currentData = item.data();

        if (!currentData) {
            return res.status(404).json({
                status: 'success',
                message: `no user found with ${req.params.user_id} id`,
                data: currentData
            })
        }

        const entryObject = {
            id: user_id,
            firstName: firstName || currentData.firstName,
            lastName: lastName || currentData.lastName,
            address_1: address_1 || currentData.address_1,
            address_2: address_2 || currentData.address_2,
            town: town || currentData.town,
            region: region || currentData.region,
            country: country || currentData.country,
            postCode: postCode || currentData.postCode,
            contactNumber: contactNumber || currentData.contactNumber
        }

        await entry.set(entryObject)

        return res.status(200).json({
            status: 'success',
            message: 'user updated successfully',
            data: entryObject
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message)
    }
}


const deleteUser = async (req, res) => {
    try {
        const { params: { user_id } } = req

        const entry = db.collection('users').doc(user_id)
        let item = await entry.get();
        let currentData = item.data();

        if (!currentData) {
            return res.status(404).json({
                status: 'success',
                message: `no user found with ${req.params.user_id} id`,
                data: currentData
            })
        }

        await entry.delete()

        return res.status(200).json({
            status: 'success',
            message: `user with ${req.params.user_id} id deleted successfully`,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message)
    }
}

module.exports = {
    getAllUser,
    getUser,
    createUser,
    updateUser,
    deleteUser
};