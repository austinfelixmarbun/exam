import { environment } from "environments/environment";
import { PathConstant } from "../../shared/PathConstant";
import { PathConstantX } from "./PathConstantX";

export class NavigationConstantX {
    public static ASSET_CONFIG_PAGING_X = '..' + "/" + '..' + "/" + PathConstantX.ASSET_CONFIG_PAGING_X; //'../../Configuration/PagingX'
    public static BACK_TO_DETAIL_X = '..' + "/" + PathConstantX.DETAIL_X; //'../DetailX'
    public static BACK_TO_PAGING_X = '..' + "/" + PathConstantX.PAGING_X; //'../PagingX'


    public static ASSET_CONFIG_PAGING2_X = "/" + PathConstant.LR_ASSET + "/" + PathConstantX.ASSET_CONFIG_PAGING_X; //'/Asset/Configuration/PagingX'

}