/**
 * The classes in this module are used in conjunction with the {@link key_stores/browser_local_storage_key_store!BrowserLocalStorageKeyStore}.
 * This module exposes two classes:
 * * {@link WalletConnection} which redirects users to [NEAR Wallet](https://wallet.near.org/) for key management.
 * * {@link ConnectedWalletAccount} is an {@link account!Account} implementation that uses {@link WalletConnection} to get keys
 *
 * @module walletAccount
 */
import { Account, SignAndSendTransactionOptions } from './account';
import { Near } from './near';
import { KeyStore } from './key_stores';
import { FinalExecutionOutcome } from './providers';
import { Transaction, Action } from './transaction';
import { PublicKey } from './utils';
import { Connection } from './connection';
interface SignInOptions {
    contractId?: string;
    methodNames?: string[];
    successUrl?: string;
    failureUrl?: string;
}
/**
 * Information to send NEAR wallet for signing transactions and redirecting the browser back to the calling application
 */
interface RequestSignTransactionsOptions {
    /** list of transactions to sign */
    transactions: Transaction[];
    /** url NEAR Wallet will redirect to after transaction signing is complete */
    callbackUrl?: string;
    /** meta information NEAR Wallet will send back to the application. `meta` will be attached to the `callbackUrl` as a url search param */
    meta?: string;
}
/**
 * This class is used in conjunction with the {@link key_stores/browser_local_storage_key_store!BrowserLocalStorageKeyStore}.
 * It redirects users to [NEAR Wallet](https://wallet.near.org) for key management.
 * This class is not intended for use outside the browser. Without `globalThis` (i.e. in server contexts), it will instantiate but will throw a clear error when used.
 *
 * @see [https://docs.near.org/tools/near-api-js/quick-reference#wallet](https://docs.near.org/tools/near-api-js/quick-reference#wallet)
 * @example
 * ```js
 * // create new WalletConnection instance
 * const wallet = new WalletConnection(near, 'my-app');
 *
 * // If not signed in redirect to the NEAR wallet to sign in
 * // keys will be stored in the BrowserLocalStorageKeyStore
 * if(!wallet.isSignedIn()) return wallet.requestSignIn()
 * ```
 */
export declare class WalletConnection {
    /** @hidden */
    _walletBaseUrl: string;
    /** @hidden */
    _authDataKey: string;
    /** @hidden */
    _keyStore: KeyStore;
    /** @hidden */
    _authData: {
        accountId?: string;
        allKeys?: string[];
    };
    /** @hidden */
    _networkId: string;
    /** @hidden */
    _near: Near;
    /** @hidden */
    _connectedAccount: ConnectedWalletAccount;
    /** @hidden */
    _completeSignInPromise: Promise<void>;
    constructor(near: Near, appKeyPrefix: string);
    /**
     * Returns true, if this WalletConnection is authorized with the wallet.
     * @example
     * ```js
     * const wallet = new WalletConnection(near, 'my-app');
     * wallet.isSignedIn();
     * ```
     */
    isSignedIn(): boolean;
    /**
     * Returns promise of completing signing in after redirecting from wallet
     * @example
     * ```js
     * // on login callback page
     * const wallet = new WalletConnection(near, 'my-app');
     * wallet.isSignedIn(); // false
     * await wallet.isSignedInAsync(); // true
     * ```
     */
    isSignedInAsync(): Promise<boolean>;
    /**
     * Returns authorized Account ID.
     * @example
     * ```js
     * const wallet = new WalletConnection(near, 'my-app');
     * wallet.getAccountId();
     * ```
     */
    getAccountId(): string;
    /**
     * Redirects current page to the wallet authentication page.
     * @param options An optional options object
     * @param options.contractId The NEAR account where the contract is deployed
     * @param options.successUrl URL to redirect upon success. Default: current url
     * @param options.failureUrl URL to redirect upon failure. Default: current url
     *
     * @example
     * ```js
     * const wallet = new WalletConnection(near, 'my-app');
     * // redirects to the NEAR Wallet
     * wallet.requestSignIn({ contractId: 'account-with-deploy-contract.near' });
     * ```
     */
    requestSignIn({ contractId, methodNames, successUrl, failureUrl }: SignInOptions): Promise<void>;
    /**
     * Requests the user to quickly sign for a transaction or batch of transactions by redirecting to the NEAR wallet.
     */
    requestSignTransactions({ transactions, meta, callbackUrl }: RequestSignTransactionsOptions): Promise<void>;
    /**
     * @hidden
     * Complete sign in for a given account id and public key. To be invoked by the app when getting a callback from the wallet.
     */
    _completeSignInWithAccessKey(): Promise<void>;
    /**
     * @hidden
     * @param accountId The NEAR account owning the given public key
     * @param publicKey The public key being set to the key store
     */
    _moveKeyFromTempToPermanent(accountId: string, publicKey: string): Promise<void>;
    /**
     * Sign out from the current account
     * @example
     * walletConnection.signOut();
     */
    signOut(): void;
    /**
     * Returns the current connected wallet account
     */
    account(): ConnectedWalletAccount;
}
/**
 * {@link account!Account} implementation which redirects to wallet using {@link WalletConnection} when no local key is available.
 */
export declare class ConnectedWalletAccount extends Account {
    walletConnection: WalletConnection;
    constructor(walletConnection: WalletConnection, connection: Connection, accountId: string);
    /**
     * Sign a transaction by redirecting to the NEAR Wallet
     * @see {@link WalletConnection.requestSignTransactions}
     */
    signAndSendTransaction({ receiverId, actions, walletMeta, walletCallbackUrl }: SignAndSendTransactionOptions): Promise<FinalExecutionOutcome>;
    /**
     * Check if given access key allows the function call or method attempted in transaction
     * @param accessKey Array of \{access_key: AccessKey, public_key: PublicKey\} items
     * @param receiverId The NEAR account attempting to have access
     * @param actions The action(s) needed to be checked for access
     */
    accessKeyMatchesTransaction(accessKey: any, receiverId: string, actions: Action[]): Promise<boolean>;
    /**
     * Helper function returning the access key (if it exists) to the receiver that grants the designated permission
     * @param receiverId The NEAR account seeking the access key for a transaction
     * @param actions The action(s) sought to gain access to
     * @param localKey A local public key provided to check for access
     */
    accessKeyForTransaction(receiverId: string, actions: Action[], localKey?: PublicKey): Promise<any>;
}
export {};
