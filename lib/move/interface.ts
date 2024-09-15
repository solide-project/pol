import { SuiMoveNormalizedModule } from "@mysten/sui/client";

export interface MoveModule {
    [key: string]: SuiMoveNormalizedModule;
}

export interface ContractBytecode {
    [module: string]: {
        functions: {
            name: string;
            visibility: string;
            inputs: number;
            outputs: number;
        }[];
    };
}
