/* tslint:disable */
/* eslint-disable */

export function load_obj_from_js(raw_bytes: Uint8Array): boolean;

export function load_ply_from_js(raw_bytes: Uint8Array): boolean;

export function load_step_from_js(raw_bytes: Uint8Array): boolean;

export function load_stl_from_js(raw_bytes: Uint8Array): boolean;

export function load_tuff_from_js(raw_bytes: Uint8Array): boolean;

export function start_viewer(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly load_obj_from_js: (a: number, b: number) => number;
    readonly load_ply_from_js: (a: number, b: number) => number;
    readonly load_step_from_js: (a: number, b: number) => number;
    readonly load_stl_from_js: (a: number, b: number) => number;
    readonly load_tuff_from_js: (a: number, b: number) => number;
    readonly start_viewer: (a: number) => void;
    readonly free_tuff_byte_array_c: (a: number) => void;
    readonly import_obj_to_tuff_c: (a: number, b: number) => void;
    readonly import_ply_to_tuff_c: (a: number, b: number) => void;
    readonly import_step_to_tuff_c: (a: number, b: number) => void;
    readonly import_stl_to_tuff_c: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_2039: (a: number, b: number, c: number, d: number) => void;
    readonly __wasm_bindgen_func_elem_451: (a: number, b: number, c: number) => void;
    readonly __wasm_bindgen_func_elem_453: (a: number, b: number, c: number) => void;
    readonly __wasm_bindgen_func_elem_455: (a: number, b: number) => void;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_export3: (a: number) => void;
    readonly __wbindgen_export4: (a: number, b: number, c: number) => void;
    readonly __wbindgen_export5: (a: number, b: number) => void;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
