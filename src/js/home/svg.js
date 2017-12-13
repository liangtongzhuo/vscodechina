import React, { Component } from 'react'

class Bottom extends Component {
    render() {
        return (
            <svg className={this.props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6" width="10" height="16" >
                <g data-reactid="255">
                    <path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path>
                </g>
            </svg>
        )
    }
}

class Good extends Component {
    render() {
        return (
            <svg className={this.props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18" width="1.2em" height="1.2em" >
                <g>
                    <path d="M0 15.243c0-.326.088-.533.236-.896l7.98-13.204C8.57.57 9.086 0 10 0s1.43.57 1.784 1.143l7.98 13.204c.15.363.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H1.955c-1.08 0-1.955-.517-1.955-1.9z"></path>
                </g>
            </svg>
        )
    }
}

class Message extends Component {
    render() {
        return (
            <svg className={this.props.className} viewBox="0 0 24 24" width="1.2em" height="1.2em">
                <path d="M10.241 19.313a.97.97 0 0 0-.77.2 7.908 7.908 0 0 1-3.772 1.482.409.409 0 0 1-.38-.637 5.825 5.825 0 0 0 1.11-2.237.605.605 0 0 0-.227-.59A7.935 7.935 0 0 1 3 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z" ></path>
            </svg>
        )
    }
}

class Collection extends Component {
    render() {
        return (
            <svg className={this.props.className} viewBox="0 0 24 24" width="1.2em" height="1.2em" >
                <path d="M5.515 19.64l.918-5.355-3.89-3.792c-.926-.902-.639-1.784.64-1.97L8.56 7.74l2.404-4.871c.572-1.16 1.5-1.16 2.072 0L15.44 7.74l5.377.782c1.28.186 1.566 1.068.64 1.97l-3.89 3.793.918 5.354c.219 1.274-.532 1.82-1.676 1.218L12 18.33l-4.808 2.528c-1.145.602-1.896.056-1.677-1.218z"></path>
            </svg>
        )
    }
}

class Share extends Component {
    render() {
        return (
            <svg className={this.props.className} viewBox="0 0 24 24" width="1.2em" height="1.2em" >
                <path d="M2.931 7.89c-1.067.24-1.275 1.669-.318 2.207l5.277 2.908 8.168-4.776c.25-.127.477.198.273.39L9.05 14.66l.927 5.953c.18 1.084 1.593 1.376 2.182.456l9.644-15.242c.584-.892-.212-2.029-1.234-1.796L2.93 7.89z" ></path>
            </svg>
        )
    }
}


export { Bottom, Good, Message, Collection, Share };