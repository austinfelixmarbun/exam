import { PathConstant } from "app/shared/PathConstant";

export class PathConstantX {
    public static DETAIL_X = PathConstant.DETAIL + "X";
    public static PAGING_X = PathConstant.PAGING + "X";

    public static ASSET_DOC_DETAIL_X = PathConstant.ASSET_DOC + "/" + PathConstantX.DETAIL_X;
    public static ASSET_DOC_PAGING_X = PathConstant.ASSET_DOC + "/" + PathConstantX.PAGING_X;
    public static ASSET_CONFIG_PAGING_X = PathConstant.ASSET_CONFIG + "/" + PathConstantX.PAGING_X;

}