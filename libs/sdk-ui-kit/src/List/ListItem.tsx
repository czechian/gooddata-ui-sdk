// (C) 2007-2020 GoodData Corporation
import React, { Component, createRef } from "react";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";

import { Bubble, BubbleHoverTrigger } from "../Bubble";

const BUBBLE_OFFSET_X = 16;

/**
 * @internal
 */
export interface ISingleSelectListItemProps {
    title?: string;
    icon?: string;

    isSelected?: boolean;

    onClick?: () => void;
    onMouseOver?: () => void;
    onMouseOut?: () => void;
}
/**
 * @internal
 */
export interface ISingleSelectListItemState {
    isOverflowed: boolean;
}
/**
 * @internal
 */
export class SingleSelectListItem extends Component<ISingleSelectListItemProps, ISingleSelectListItemState> {
    private titleRef = createRef<HTMLSpanElement>();

    constructor(props: ISingleSelectListItemProps) {
        super(props);
        this.state = { isOverflowed: false };
    }

    public render(): JSX.Element {
        const { icon, onClick, onMouseOver, onMouseOut } = this.props;
        return (
            <div
                className={this.getClassNames()}
                onClick={onClick}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
                {this.renderIcon(icon)}
                {this.renderTitle()}
            </div>
        );
    }

    public componentDidMount(): void {
        if (this.titleRef.current) {
            // Checks if ellipsis has been applied on title span
            const isOverflowed = this.titleRef.current.offsetWidth < this.titleRef.current.scrollWidth;
            if (isOverflowed) {
                // eslint-disable-next-line react/no-did-mount-set-state
                this.setState({
                    isOverflowed,
                });
            }
        }
    }

    private getClassNames = () => {
        const { title, isSelected } = this.props;
        const generatedSeleniumClass = `s-${stringUtils.simplifyText(title)}`;

        return cx("gd-list-item", generatedSeleniumClass, { "is-selected": isSelected });
    };

    private renderTitle = () => {
        const { title } = this.props;

        const titleElement = <span ref={this.titleRef}>{title}</span>;

        if (this.state.isOverflowed) {
            return (
                <BubbleHoverTrigger>
                    {titleElement}
                    <Bubble
                        className="bubble-primary"
                        alignPoints={[{ align: "cr cl" }]}
                        arrowOffsets={{ "cr cl": [BUBBLE_OFFSET_X, 0] }}
                    >
                        {title}
                    </Bubble>
                </BubbleHoverTrigger>
            );
        }

        return titleElement;
    };

    private renderIcon = (icon: string) => {
        if (icon) {
            const iconClasses = cx("gd-list-icon", icon);
            return <span className={iconClasses} />;
        }

        return null;
    };
}
