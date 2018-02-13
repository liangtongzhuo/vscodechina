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

class Read extends Component {
    render() {
        return (
            <svg className={this.props.className} viewBox="0 0 24 24" width="1.3em" height="1.3em" >
                <path d="M5.74 4h12.52c.961 0 1.74.775 1.74 1.73V16.27c0 .955-.779 1.73-1.74 1.73h-3.825l-1.658 2.044a1 1 0 0 1-1.554 0l-1.658-2.044H5.74C4.78 18 4 17.224 4 16.27V5.73C4 4.775 4.778 4 5.74 4zM7 8.98c0 .554.449.996 1.003.996h4.994A.992.992 0 0 0 14 8.981a.997.997 0 0 0-1.003-.995H8.003A.992.992 0 0 0 7 8.98zm0 4c0 .554.446.996.995.996h8.01a.993.993 0 0 0 .995-.995.993.993 0 0 0-.995-.995h-8.01A.993.993 0 0 0 7 12.98z" ></path>
            </svg>
        )
    }
}

class Reply extends Component {
    render() {
        return (
            <svg className={this.props.className} viewBox="0 0 24 20" width="1.2em" height="1.2em" >
                <g >
                    <path d="M21.96 13.22c-1.687-3.552-5.13-8.062-11.637-8.65-.54-.053-1.376-.436-1.376-1.56V.677c0-.52-.635-.915-1.116-.52L.47 6.67C.18 6.947 0 7.334 0 7.763c0 .376.14.722.37.987 0 0 6.99 6.818 7.442 7.114.453.295 1.136.124 1.135-.5V13c.027-.814.703-1.466 1.532-1.466 1.185-.14 7.596-.077 10.33 2.396 0 0 .395.257.535.257.892 0 .614-.967.614-.967z"></path>
                </g>
            </svg>
        )
    }
}

class MessageGood extends Component {
    render() {
        return (
            <svg className={this.props.className} viewBox="0 0 24 20" width="1.2em" height="1.2em" >
                <path d="M.718 7.024c-.718 0-.718.63-.718.63l.996 9.693c0 .703.718.65.718.65h1.45c.916 0 .847-.65.847-.65V7.793c-.09-.88-.853-.79-.846-.79l-2.446.02zm11.727-.05S13.2 5.396 13.6 2.89C13.765.03 11.55-.6 10.565.53c-1.014 1.232 0 2.056-4.45 5.83C5.336 6.965 5 8.01 5 8.997v6.998c-.016 1.104.49 2 1.99 2h7.586c2.097 0 2.86-1.416 2.86-1.416s2.178-5.402 2.346-5.91c1.047-3.516-1.95-3.704-1.95-3.704l-5.387.007z"></path>
            </svg>
        )
    }
}

class Edid extends Component {
    render() {
        return (
            <svg className={this.props.className} viewBox="0 3 24 20" width="1.2em" height="1.2em" >
                <path d="M16.886 3A4.114 4.114 0 0 1 21 7.114v9.772A4.114 4.114 0 0 1 16.886 21H7.114A4.114 4.114 0 0 1 3 16.886V7.114A4.114 4.114 0 0 1 7.114 3h9.772zM7.542 14.793l-.595 1.985a.22.22 0 0 0 .275.275l1.984-.595a2.36 2.36 0 0 0 .991-.592l4.82-4.82a.295.295 0 0 0 0-.416L13.37 8.983a.295.295 0 0 0-.417 0l-4.82 4.82c-.275.277-.478.617-.59.99zm9.272-6.826l-.781-.78a.849.849 0 0 0-1.202 0l-.952.951c-.11.11-.11.29 0 .4l1.582 1.583a.283.283 0 0 0 .4 0l.953-.952a.85.85 0 0 0 0-1.202z" ></path>
            </svg>
        )
    }
}



export { Bottom, Good, Message, Collection, Share, Reply, MessageGood, Read ,Edid};