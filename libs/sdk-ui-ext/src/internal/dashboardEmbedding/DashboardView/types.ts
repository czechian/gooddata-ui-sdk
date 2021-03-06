// (C) 2020 GoodData Corporation
import { IAnalyticalBackend, ITheme, IDashboard, IWidgetAlert } from "@gooddata/sdk-backend-spi";
import { ObjRef, IFilter } from "@gooddata/sdk-model";
import {
    IDrillableItem,
    IHeaderPredicate,
    OnFiredDrillEvent,
    IErrorProps,
    ILoadingProps,
    OnError,
} from "@gooddata/sdk-ui";

/**
 * @beta
 */
export interface IDashboardViewProps {
    /**
     * Reference to the dashboard to display.
     */
    dashboard: ObjRef;

    /**
     * Optionally, specify filters to be applied to all the widgets in the dashboard
     * on top of any filters the dashboard already has saved within.
     */
    filters?: IFilter[];

    /**
     * Configure drillability; e.g. which parts of the visualization can be interacted with.
     * These are applied to all the widgets in the dashboard.
     *
     * TODO: do we need more sophisticated logic to specify drillability?
     */
    drillableItems?: Array<IDrillableItem | IHeaderPredicate>;

    /**
     * Called when user triggers a drill on a visualization.
     */
    onDrill?: OnFiredDrillEvent;

    /**
     * Backend to work with.
     *
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the executor MUST be rendered within an existing BackendContext.
     */
    backend?: IAnalyticalBackend;

    /**
     * Workspace where the dashboard exists.
     *
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the executor MUST be rendered within an existing WorkspaceContext.
     */
    workspace?: string;

    /**
     * Theme to use.
     *
     * Note: the theme can come either from this property or from ThemeContext or from the dashboard.
     * If you do not specify theme here, it will be taken from an existing ThemeContext or if there is no ThemeContext,
     * it will be loaded for the dashboard.
     */
    theme?: ITheme;

    /**
     * When true, disables the loading of the workspace theme and creation of a ThemeProvider (if there is none
     * already present in the parent scope). Currently – for technical reasons – the ThemeProvider changes the theme
     * globally (i.e. the theme is NOT constrained inside of a ThemeProvider).
     *
     * Turn this property to true if you need to avoid the global aspect of the themes, or you do not want to use themes at all.
     * @default false
     */
    disableThemeLoading?: boolean;

    /**
     * Component to render if embedding fails.
     * This component is also used in all the individual widgets when they have some error occur.
     *
     * TODO do we need separate component for the dashboard as a whole and individual widgets?
     */
    ErrorComponent?: React.ComponentType<IErrorProps>;

    /**
     * Component to render while the dashboard or a widget is loading.
     * This component is also used in all the individual widgets while they are loading.
     *
     * TODO do we need separate component for the dashboard as a whole and individual widgets?
     */
    LoadingComponent?: React.ComponentType<ILoadingProps>;

    /**
     * Called when the dashboard is loaded. This is to allow the imbedding code to read the dashboard data
     * (for example to adapt its filter UI according to the filters saved in the dashboard).
     */
    onDashboardLoaded?: (params: { dashboard: IDashboard; alerts: IWidgetAlert[] }) => void;

    /**
     * Called in case of any error, either in the dashboard loading or any of the widgets execution.
     */
    onError?: OnError;
}
