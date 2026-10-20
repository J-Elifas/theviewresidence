import { NextResponse } from "next/server";

interface MutationResult {
    ok: boolean;
    message?: string;
}

interface JsonRequestOptions<TInput, TResult extends MutationResult> {
    request: Request;
    parseInput: (body: unknown) => TInput | null;
    mutate: (input: TInput) => Promise<TResult>;
    successStatus?: number;
}

// Shared plumbing for public JSON Route Handlers: read the body, validate it, run one mutation.
export async function handleJsonRequest<TInput, TResult extends MutationResult>({
    mutate,
    parseInput,
    request,
    successStatus = 200,
}: JsonRequestOptions<TInput, TResult>) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
    }

    const input = parseInput(body);

    if (!input) {
        return NextResponse.json(
            { ok: false, message: "Please check your details and try again." },
            { status: 400 }
        );
    }

    const result = await mutate(input);

    return NextResponse.json(result, { status: result.ok ? successStatus : 500 });
}
