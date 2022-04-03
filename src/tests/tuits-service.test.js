import {createTuit, deleteTuit, deleteTuitByContent, findTuitById, findAllTuits} from "../services/tuits-service.js";
import {
  createUser,
  deleteUsersByUsername, findAllUsers,
  findUserById
} from "../services/users-service.js";
import 'regenerator-runtime/runtime' 

describe('createTuit', () => {

  // sample user to insert
  const foru1 = {
    username: 'foru',
    password: 'foru123',
    email: 'foru@foru.com'
  };
  // sample tuit to insert
  const tuit1 = {
    tuit : 'Hi i am meet'
  };

  // setup test before running test
  beforeAll(() => {
    // remove any/all users and tuits to make sure we create it in the test
    return deleteUsersByUsername(foru1.username) && deleteTuitByContent(tuit1.tuit);
  })

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteUsersByUsername(foru1.username) && deleteTuitByContent(tuit1.tuit);
  })

  test('can insert new tuits with REST API', async () => {

    // insert the user in the database
    const newUser = await createUser(foru1);

    // verify new user matches the parameter user
    expect(newUser.username).toEqual(foru1.username);
    expect(newUser.password).toEqual(foru1.password);
    expect(newUser.email).toEqual(foru1.email);
    
    // insert tuit in the database
    const newTuit = await createTuit(newUser._id,tuit1);
    // verify new tuit matches the parameter user
    expect(newTuit.tuit).toEqual(tuit1.tuit);
  });
});

describe('deleteTuit', () => {

   // sample user to insert
  const foru1 = {
    username: 'foru',
    password: 'foru123',
    email: 'foru@foru.com'
  };

    // sample tuit to insert
  const tuit1 = {
    tuit : 'Hi i am meet'
  };
  let dummyUser = "";
  let newTuit = "";

  // setup test before running test
  beforeAll(async() => {
    // creating users and tuit for the test
    dummyUser = await createUser(foru1);
    newTuit = await createTuit(dummyUser._id, tuit1);
  })

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    deleteTuitByContent(tuit1.tuit);
    return deleteUsersByUsername(foru1.username);
  })

  test('can delete tuit withh REST API', async () => {
    // delete a tuit by its content. Assumes tuit already exists
    const status = await deleteTuitByContent(tuit1.tuit);

    // verify we deleted at least one tuit by their content
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });

});

describe('retrieveTuitByTuitId', () => {

  // sample user to insert
  const foru1 = {
    username: 'foru',
    password: 'foru123',
    email: 'foru@foru.com'
  };

  // sample tuit to insert
  const tuit1 = {
    tuit : 'Hi i am meet'
  };
  let dummyUser = "";
  let newTuit = "";
  
  // setup test before running test
  beforeAll(async() => {
    // creating users and tuit for the test
    dummyUser = await createUser(foru1);
    newTuit = await createTuit(dummyUser._id, tuit1);
  })


  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    deleteTuitByContent(tuit1.tuit);
    return deleteUsersByUsername(foru1.username);
  })

  test('can retrieve a tuit by their primary key with REST API', async () => {

    // retrieve the tuit from the database by its primary key
    const existingTuit = await findTuitById(newTuit._id);
    
    // verify retrieved tuit matches parameter user
    expect(existingTuit.tuit).toEqual(tuit1.tuit);
    });
});

describe('retreiveAllTuits', () => {

   // sample user to insert
  const foru1 = {
    username: 'foru',
    password: 'foru123',
    email: 'foru@foru.com'
  };

  // sample tuit to insert
  const tuit1 = ["tuit1", "tuit2", "tuit3"]
      
  let dummyUser = "";

  // setup test before running test
  beforeAll(async () => {
    // creating multiple users and tuit
    dummyUser = await createUser(foru1);
    tuit1.map(tuit =>
        createTuit(dummyUser._id,
            {
                tuit: tuit,
            })
    )
    })


  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    tuit1.map(tuit =>
      deleteTuitByContent(tuit)
    )
    return deleteUsersByUsername(foru1.username);
})

  test('can retrieve all tuits with REST API', async () => {

    // retrieve all the tuits
    const allTuits = await findAllTuits();
    
    // let's check length of allTuits array in database with out tuit array database
    expect(allTuits.length).toBeGreaterThanOrEqual(tuit1.length);
    const tuitsWeInserted = allTuits.filter(
      tuit => tuit1.indexOf(tuit.tuit) >= 0);
    
    // let's check each tuit in the database with the ones we sent
    tuitsWeInserted.forEach(tuit => {
      const tuitName = tuit1.find(tuitName => tuitName === tuit.tuit);
      expect(tuit.tuit).toEqual(tuitName);
  });
 });
});