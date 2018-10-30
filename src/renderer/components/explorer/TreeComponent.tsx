import * as React from 'react'
import * as t from 'react-treebeard'

export interface Child {
    name: string
    children?: Child[]
    loading?: boolean
    entryId?: any
}

export interface Tree {
    name: string
    toggled: boolean
    children?: Child[]
}

export interface TreeComponentProps {
    tree: Tree
    onLeafClick: (leafId: string) => void
}

export default class TreeComponent extends React.Component<TreeComponentProps, any> {
    constructor(props: TreeComponentProps) {
        super(props)
        this.state = {}
        this.onToggle = this.onToggle.bind(this)
    }

    onToggle(node: any, toggled: boolean) {
        if ((!node.children || node.children.length === 0) && !!node.entryId) {
            this.props.onLeafClick(node.entryId)
        }

        if (this.state.cursor) {
            this.state.cursor.active = false
        }
        node.active = true

        if (node.children) {
            node.toggled = toggled
        }
        this.setState({ cursor: node })
    }

    render() {
        return (
            <div>
                <t.Treebeard
                    data={this.props.tree}
                    decorators={t.decorators}
                    onToggle={this.onToggle}
                />
            </div>
        )
    }
}
