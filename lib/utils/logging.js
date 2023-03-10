"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printTxOutcomeLogs = exports.printTxOutcomeLogsAndFailures = void 0;
const rpc_errors_1 = require("./rpc_errors");
const SUPPRESS_LOGGING = true;
/**
 * Parse and print details from a query execution response
 * @param params
 * @param params.contractId ID of the account/contract which made the query
 * @param params.outcome the query execution response
 */
function printTxOutcomeLogsAndFailures({ contractId, outcome, }) {
    if (SUPPRESS_LOGGING) {
        return;
    }
    const flatLogs = [outcome.transaction_outcome, ...outcome.receipts_outcome]
        .reduce((acc, it) => {
        const isFailure = typeof it.outcome.status === 'object' && typeof it.outcome.status.Failure === 'object';
        if (it.outcome.logs.length || isFailure) {
            return acc.concat({
                receiptIds: it.outcome.receipt_ids,
                logs: it.outcome.logs,
                failure: typeof it.outcome.status === 'object' && it.outcome.status.Failure !== undefined
                    ? (0, rpc_errors_1.parseRpcError)(it.outcome.status.Failure)
                    : null
            });
        }
        else {
            return acc;
        }
    }, []);
    for (const result of flatLogs) {
        console.log(`Receipt${result.receiptIds.length > 1 ? 's' : ''}: ${result.receiptIds.join(', ')}`);
        printTxOutcomeLogs({
            contractId,
            logs: result.logs,
            prefix: '\t',
        });
        if (result.failure) {
            console.warn(`\tFailure [${contractId}]: ${result.failure}`);
        }
    }
}
exports.printTxOutcomeLogsAndFailures = printTxOutcomeLogsAndFailures;
/**
 * Format and print log output from a query execution response
 * @param params
 * @param params.contractId ID of the account/contract which made the query
 * @param params.logs log output from a query execution response
 * @param params.prefix string to append to the beginning of each log
 */
function printTxOutcomeLogs({ contractId, logs, prefix = '', }) {
    if (SUPPRESS_LOGGING) {
        return;
    }
    for (const log of logs) {
        console.log(`${prefix}Log [${contractId}]: ${log}`);
    }
}
exports.printTxOutcomeLogs = printTxOutcomeLogs;
