import type { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Writes .last-run.json after the built-in LastRunReporter finishes.
 *
 * The built-in reporter always runs last in the reporter chain (appended by
 * Playwright internals) and overwrites the file with failedTests:[] when
 * onBegin is skipped on Windows. By writing in onExit() instead of onEnd(),
 * this reporter runs after the built-in's onEnd() — the built-in has no
 * onExit(), so our write is never overwritten.
 */
class LastRunReporter implements Reporter {
    private readonly outputFile: string;
    private readonly failedIds: string[] = [];
    private status: string = 'passed';

    constructor() {
        this.outputFile = path.join(process.cwd(), 'test-results', '.last-run.json');
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        if (result.status === 'failed' || result.status === 'timedOut') {
            this.failedIds.push(test.id);
        }
    }

    async onEnd(result: FullResult): Promise<void> {
        this.status = result.status;
    }

    async onExit(): Promise<void> {
        const data = {
            status: this.status,
            failedTests: this.failedIds,
        };
        fs.mkdirSync(path.dirname(this.outputFile), { recursive: true });
        fs.writeFileSync(this.outputFile, JSON.stringify(data, null, 2));
    }
}

export default LastRunReporter;
