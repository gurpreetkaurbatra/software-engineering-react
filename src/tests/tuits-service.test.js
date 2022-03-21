import {
    createTuit, deleteTuit, findTuitById, findAllTuits, deleteTuitByContent
} from "../services/tuits-service";

import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";

describe('can retrieve a tuit by their primary key with REST API', () => {
    // sample user to insert
    const mock = {
        username: 'mock',
        password: 'zaq12wsx',
        email: 'mock@xyz.com'
    };

    //sample tuit to insert
    const userTuit = {
        tuit: 'testTuit',
    };

    beforeAll(async () => {
        deleteUsersByUsername(mock.username);
        return deleteTuitByContent(userTuit.tuit);
    })

    afterAll(() => {
        deleteUsersByUsername(mock.username);
        return deleteTuitByContent(userTuit.tuit);
    })

    test('can retrieve a tuit by their primary key with REST API', async () => {
        const newUser = await createUser(mock);
        const newTuit = await createTuit(newUser._id, userTuit);

        expect(newTuit.tuit).toEqual(userTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);

        const existingTuit = await findTuitById(newTuit._id);

        expect(existingTuit.tuit).toEqual(userTuit.tuit);
       // expect(existingTuit.postedBy._id).toEqual(newUser._id)
    })
});

describe('createTuit',  () => {
    // sample user to insert
    const mockTest = {
        username: 'mockTest',
        password: 'zaq12wsx',
        email: 'mockTest@xyz.com'
    };

    //sample tuit to insert
    const UserTuit = {
        tuit: "UserTuit"
    };

    // clean up before test runs
    beforeAll( () => {
        deleteUsersByUsername(mockTest.username);
        return deleteTuitByContent(UserTuit.tuit);
    })

    // clean up after test runs
    afterAll( () => {
        // remove any data we created
        deleteUsersByUsername(mockTest.username);
        return deleteTuitByContent(UserTuit.tuit);
    })


    test('can create tuit with REST API', async () => {
        // insert new tuit in the database
        const newUser = await createUser(mockTest);
        const newTuit = await createTuit(newUser._id, UserTuit);

        // verify inserted tuit's properties match parameter user
        expect(newTuit.tuit).toEqual(UserTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);
    });
});

describe('can retrieve all tuits with REST API', () => {

    const mockTest = {
        username: 'mockTest',
        password: 'zaq12wsx',
        email: 'mockTest@xyz.com'
    };

    const tuits = [
        {
            tuit: "testTuit1"
        },
        {
            tuit: "testTuit2"
        },
        {
            tuit: "testTuit3"
        },
    ]

    beforeAll(async () => {
        tuits.forEach(t => {
            deleteTuitByContent(t);
        })
        return deleteUsersByUsername(mockTest.username);
    })

    afterAll(() => {
        // remove any data we created
        tuits.forEach(t => {
            deleteTuitByContent(t);
        })
        deleteUsersByUsername(mockTest.username);
    })

    test('can retrieve all tuits with REST API', async () => {
        const newUser = await createUser(mockTest);
        tuits.map(tuit =>
                      createTuit(
                          newUser._id,
                          tuit
                      )
        )

        const newTuits = await findAllTuits();
        // there should be a minimum number of tuits
        expect(newTuits.length).toBeGreaterThanOrEqual(tuits.length);

        // let's check each tuit we inserted
        const tuitsWeInserted = tuits.filter(
            tuit => tuits.indexOf(tuit.tuit) >= 0);

        tuitsWeInserted.forEach(t => {
            const tuit = tuits.find(tuit => tuit === t.tuit);
            expect(t.tuit).toEqual(tuit);
            expect(t.postedBy._id).toEqual(newUser._id);
        });
    })
});


describe('can delete tuit wtih REST API',  () => {
    // sample user to insert
    const mockTest = {
        username: 'mockTest',
        password: 'zaq12wsx',
        email: 'mockTest@xyz.com'
    };

    //sample tuit to insert
    const testTuit = {
        tuit: 'testTheft'
    };

    beforeAll(() => {
        deleteUsersByUsername(mockTest.username);
        return deleteTuitByContent(testTuit.tuit);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteUsersByUsername(mockTest.username);
        return deleteTuitByContent(testTuit.tuit);
    })


    test('can delete tuit wtih REST API', async () => {
        // insert new tuit in the database
        const newUser = await createUser(mockTest);
        const newTuit = await createTuit(newUser._id, testTuit);

        // delete a user by their username. Assumes user already exists
        const status = await deleteTuit(newTuit._id);

        // verify we deleted at least one tuit by its id
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});