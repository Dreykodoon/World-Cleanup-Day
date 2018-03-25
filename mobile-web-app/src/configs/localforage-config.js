import localForage from 'localforage';

export default function configureLocalforage() {
    localForage.config({
        name: 'Let\' do it World! LITE',
        driver: localForage.INDEXEDDB,
        storeName: 'LDIWL store',
        description: 'Allows storing trashpoint drafts for later use.'
    });
}
