import './Contact.scss';
const Contact = () => {
    return (<>
    <form action="" id='contact'>
        <div className="container">
            <div className="header"> <h2>Contact Us</h2></div>
            <div className="Conactmenu">
                <div className="Email">
                    <label htmlFor="Email">Email</label>
                    <input type="email" name="" id="Email" placeholder="type email ..." />
                </div>
            </div>
            <div className="content"> <label htmlFor="FullName">FullName</label>
                <input type="text" name="" id="FullName" placeholder="type fullname ..." />
                <label htmlFor="LastName">LastName</label>
                <input type="text" name="" id="LastName" placeholder="type lastname ..." /></div>
            <div className="footer">
                <label htmlFor="message">message</label>
                <textarea name="" id="message" cols="30" rows="10" placeholder="type message ..."></textarea>
            </div>
        </div>
        <button type="submit">Send</button>
    </form>
    </>)
}
export default Contact;