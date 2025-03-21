const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Logged In",
            user: req.user,
        });
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Login failure",
    });
});

// Fix Google Auth Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login/failed",
    }),
    (req, res) => {
        // Redirect to dashboard on success
        res.redirect("http://localhost:5173/dashboard");
    }
);

// Fix Logout Route (Ensure proper session clearance)
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("http://localhost:5173/login"); // Redirect to login after logout
    });
});

module.exports = router;
