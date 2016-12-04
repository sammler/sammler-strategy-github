import ProfileHistoryBL from './../../src/modules/profile-history/profile-history.bl';
import Context from './../../src/config/context';
import DBHelpers from './../lib/db-helpers';

describe( 'profile-history.bl', () => {

  let profileHistoryBL;
  let dbHelpers;
  let context;
  before( ( done ) => {
    context = Context.instance();
    profileHistoryBL = new ProfileHistoryBL();
    dbHelpers = new DBHelpers();
    dbHelpers.dropDatabase( done );
  } );

  it( 'save should just save the item', () => {
    let doc = {
      id: 1,
      login: 'stefanwalther',
      foo: 'profile-history',
      lastUpdate: new Date().setUTCHours( 0, 0, 0, 0 )
    };
    return profileHistoryBL.save( doc )
      .then( result => {
        expect( result ).to.exist;
        expect( result._doc ).to.have.property( 'login' );
        expect( result._doc ).to.have.property( 'lastUpdate' );
      } );
  } );

  it( 'if the date is different a new rec will be created', () => {

    let dateToday = new Date();

    let doc1 = {
      id: 1,
      login: 'stefanwalther',
      foo: 'profile-history',
      lastUpdate: dateToday.setUTCHours( 0, 0, 0, 0 )
    };

    let dateYesterday = new Date( dateToday.setDate( dateToday.getDate() - 1 ) );
    dateYesterday = dateYesterday.setUTCHours( 0, 0, 0, 0 );
    let doc2 = {
      id: 1,
      login: 'stefanwalther',
      foo: 'profile-history',
      lastUpdate: dateYesterday
    };

    return profileHistoryBL.removeAll()
      .then( () => {
        return Promise.all( [
          profileHistoryBL.save( doc1 ),
          profileHistoryBL.save( doc2 )
        ] )
          .catch( ( err ) => {
            expect( err ).to.not.exist;
          } );
      } );
  } );

  //Todo: Doesn't seem to be robust, return 2 instead of 1 from time to time ... ?!
  it( 'updates and existing item automatically (per profile/day)', () => {

    let doc1 = {
      id: 1,
      login: 'stefanwalther',
      foo: 'profile-history',
      lastUpdate: new Date().setUTCHours( 0, 0, 0, 0 )
    };

    let doc2 = {
      id: 1,
      login: 'stefanwalther',
      foo: 'profile-history2',
      lastUpdate: new Date().setUTCHours( 0, 0, 0, 0 )
    };

    return profileHistoryBL.removeAll()
      .then( () => {
        return Promise.all( [
          profileHistoryBL.save( doc1 ),
          profileHistoryBL.save( doc2 )
        ] )
          .then( () => {
            return profileHistoryBL.countPerProfileId( 1 )
              .then( ( count ) => {
                expect( count ).to.be.equal( 1 )
              } )
          } )
      } )
  } );

} );
